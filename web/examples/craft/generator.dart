part of craft;

/// The generator will initialize chunks to create the world.
class Generator {

  /// The noise generator for the world.
  simplex.OpenSimplexNoise _simplex;

  /// The temporary turrain height so that noise doesn't have to be calculated as much.
  data.Uint8List _tempCache;

  /// The current chunk that is being worked on.
  Chunk _curChunk;
  
  /// Creates a new generator for the given world.
  Generator([int seed = 0]) {
    this._simplex = new simplex.OpenSimplexNoise(seed);
    this._tempCache = new data.Uint8List(Constants.heightCacheLength);
    this._curChunk = null;
  }

  /// Fills the given chunk with data.
  void fillChunk(Chunk chunk) {
    if (chunk == null) return;
    this._curChunk = chunk;
    this._prepareHeightCache();
    this._clearChunk();
    this._turrain();
    this._applyWater();
    this._applySand();
    this._trees();
    this._addPyramid();
    this._plants();
    this._add3Dart();
    this._towerOfPimps();
    chunk.finishGenerate();
  }

  /// Get the scaled 2D noise offset for the given chunk.
  double _noise(int x, int z, double scale) =>
    this._simplex.eval2D((x + this._curChunk.x)*scale, (z + this._curChunk.z)*scale)*0.5 + 0.5;
    
  /// Gets the height of the turrain from the prepared height cache.
  int _turrainHeight(int x, int z) =>
    this._tempCache[(x+Constants.borderSize)*Constants.paddedSize + (z+Constants.borderSize)];

  /// Prepares the temporary cached turrain height.
  void _prepareHeightCache() {
    int offset = 0;
    for (int x = Constants.paddedMin; x < Constants.paddedMax; x++) {
      for (int z = Constants.paddedMin; z < Constants.paddedMax; z++) {
        double terrain = 0.6 * this._noise(x, z, 0.001) +
                        0.3 * this._noise(x, z, 0.01) +
                        0.1 * this._noise(x, z, 0.1);
        int maxy = (math.pow(terrain, 2.0)*Constants.chunkYSize).toInt();
        maxy = (maxy >= Constants.chunkYSize)? Constants.chunkYSize-1: maxy;
        this._tempCache[offset] = maxy;
        offset++;
      }
    }
  }

  /// Cleares the chunk of all block data.
  void _clearChunk() {
    this._curChunk._data.fillRange(0, Constants.chunkDataLength, BlockType.Air);
  }

  /// Applies the turrain (turf, dirt, and rock) to the current chunk.
  void _turrain() {
    for (int x = 0; x < Constants.chunkSideSize; x++) {
      for (int z = 0; z < Constants.chunkSideSize; z++) {
        this._turrainBlock(x, z);
      }
    }
  }

  /// Determines the turrain blocks for the column in the current chunk.
  void _turrainBlock(int x, int z) {
    int maxy = this._turrainHeight(x, z);
    for (int y = 0; y <= maxy; y++) {
      int block = BlockType.Rock;
      if (maxy < Constants.waterDepth) {
        if (maxy - Constants.sandDepth <= y) {
          block = BlockType.Sand;
        }
      } else {
        if (maxy == y) {
          block = BlockType.Turf;
        } else if (maxy - Constants.dirtDepth <= y) {
          block = BlockType.Dirt;
        }
      }
      this._curChunk.setBlock(x, y, z, block);
    }
  }

  /// Applies the water for the given chunk.
  void _applyWater() {
    for (int x = 0; x < Constants.chunkSideSize; x++) {
      for (int z = 0; z < Constants.chunkSideSize; z++) {
        this._applyWaterBlock(x, z);
      }
    }
  }

  /// Determines the water blocks for a column.
  void _applyWaterBlock(int x, int z) {
    int maxy = this._curChunk.topHit(x, z, 0);
    if (maxy < Constants.waterDepth) {
      for (int y = Constants.waterDepth; y > maxy; y--) {
        this._curChunk.setBlock(x, y, z, BlockType.Water);
      }
    }
  }

  /// Determines the water blocks and adds surrounding sand blocks.
  void _applySand() {
    for (int x = -1; x <= Constants.chunkSideSize; x++) {
      for (int z = -1; z <= Constants.chunkSideSize; z++) {
        this._applySandBlock(x, z);
      }
    }
  }

  /// Determines the water blocks and adds surrounding sand blocks.
  void _applySandBlock(int x, int z) {
    int maxy = this._turrainHeight(x, z);
    if (maxy < Constants.waterDepth) {
      for (int y = Constants.maxEdgeSand; y > Constants.minEdgeSand; y--) {
        for (int dx = -1; dx <= 1; dx++) {
          for (int dz = -1; dz <= 1; dz++) {
            int value = this._curChunk.getBlock(x+dx, y, z+dz);
            if (value == BlockType.Turf || value == BlockType.DryLeaves) {
              this._curChunk.setBlock(x+dx, y, z+dz, BlockType.Sand);
            }
          }
        }
      }
    }
  }

  /// Determines the trees for the given chunk.
  /// The leaves will hang over into neighbor chunks.
  void _trees() {
    for (int x = Constants.paddedMin; x < Constants.paddedMax; x++) {
      for (int z = Constants.paddedMin; z < Constants.paddedMax; z++) {
        if (this._noise(x, z, 1.5) < 0.1)
          this._addTree(x, z);
      }
    }
  }

  /// Adds a tree at the given [x] and [z] to this chunk.
  void _addTree(int x, int z) {
    // Don't place a tree too close to the pyramid
    if ((x + this._curChunk.x >= -Constants.pyramidSize) &&
        (x + this._curChunk.x < Constants.pyramidSize) &&
        (z + this._curChunk.z >= -Constants.pyramidSize) &&
        (z + this._curChunk.z < Constants.pyramidSize))
      return;

    int maxy = this._turrainHeight(x, z);
    if (maxy < Constants.treeMin) return;

    for (int y = 1; y < Constants.treeHeight; y++) {
      this._curChunk.setBlock(x, maxy + y, z, BlockType.TrunkUD);
    }

    _addTreeBase(x, z);
    _addTreeLeaves(x, maxy + Constants.treeHeight, z);
  }

  /// Adds the base of a tree to the given [x] and [z] to this chunk.
  void _addTreeBase(int x, int z) {
    for (int px = -Constants.deadLeavesRadius; px <= Constants.deadLeavesRadius; px++) {
      for (int pz = -Constants.deadLeavesRadius; pz <= Constants.deadLeavesRadius; pz++) {
        if ((px * px + pz * pz) <= Constants.deadLeavesRadius2) {
          for (int y = Constants.chunkYSize-1; y >= 0; y--) {
            if (this._curChunk.getBlock(x+px, y, z+pz) == BlockType.Turf) {
              this._curChunk.setBlock(x+px, y, z+pz, BlockType.DryLeaves);
              break;
            }
          }
        }
      }
    }
  }

  /// Adds the leaves of a tree to the given [x] and [z] to this chunk.
  void _addTreeLeaves(int x, int y, int z) {
    for (int px = -Constants.leavesRadius; px <= Constants.leavesRadius; px++) {
      for (int py = -Constants.leavesRadius; py <= Constants.leavesRadius; py++) {
        for (int pz = -Constants.leavesRadius; pz <= Constants.leavesRadius; pz++) {
          if ((px * px + py * py + pz * pz) <= Constants.leavesRadius2) {
            if (this._curChunk.getBlock(x+px, y+py, z+pz) == BlockType.Air) {
              this._curChunk.setBlock(x+px, y+py, z+pz, BlockType.Leaves);
            }
          }
        }
      }
    }
  }

  /// Adds plants to the given chunk.
  void _plants() {
    for (int x = 0; x < Constants.chunkSideSize; x++) {
      for (int z = 0; z < Constants.chunkSideSize; z++) {
        if (this._noise(x, z, 12.5) < 0.1)
          this._addPlant(x, z, BlockType.RedFlower);
        else if (this._noise(x+400, z, 12.5) < 0.1)
          this._addPlant(x, z, BlockType.BlueFlower);
        else if (this._noise(x, z+400, 12.5) < 0.1)
          this._addPlant(x, z, BlockType.WhiteFlower);
        else if (this._noise(x+400, z+400, 12.5) < 0.15)
          this._addPlant(x, z, BlockType.Grass);
        else if (this._noise(x-400, z, 12.5) < 0.1)
          this._addPlant(x, z, BlockType.Fern);
        else if (this._noise(x, z-400, 12.5) < 0.08)
          this._addPlant(x, z, BlockType.Mushroom);
      }
    }
  }

  /// Adds a plant to the given chain.
  void _addPlant(int x, int z, int value) {
    int maxy = this._curChunk.topHit(x, z, 0);
    int oldValue = this._curChunk.getBlock(x, maxy, z);
    if (oldValue != BlockType.Turf && oldValue != BlockType.DryLeaves) return;
    this._curChunk.setBlock(x, maxy+1, z, value);
  }

  /// Adds the pyramid to the center of the world.
  void _addPyramid() {
    if ((this._curChunk.x + Constants.chunkSideSize < -Constants.pyramidSize) ||
        (this._curChunk.x > Constants.pyramidSize) ||
        (this._curChunk.z + Constants.chunkSideSize < -Constants.pyramidSize) ||
        (this._curChunk.z > Constants.pyramidSize))
      return;
      
    var put = (int dx, int dy, int dz, int value) {
      this._curChunk.setBlock(dx - this._curChunk.x, dy, dz - this._curChunk.z, value);
    };

    for (int py = Constants.pyramidSize; py >= 0; py-=2) {
      int width = (Constants.pyramidSize-py)+3;
      for (int px = -width; px <= width; px++) {
        for (int pz = -width; pz <= width; pz++) {
          put(px, py, pz, BlockType.WhiteShine);
          put(px, py-1, pz, BlockType.WhiteShine);
        }
      }

      for (int pw = -2; pw <= 2; pw++) {
        put(-width-1, py, pw, BlockType.Brick);
        put(-width-1, py-1, pw, BlockType.Brick);
        put(-width-2, py-1, pw, BlockType.Brick);

        put(width+1, py, pw, BlockType.Brick);
        put(width+1, py-1, pw, BlockType.Brick);
        put(width+2, py-1, pw, BlockType.Brick);

        put(pw, py, -width-1, BlockType.Brick);
        put(pw, py-1, -width-1, BlockType.Brick);
        put(pw, py-1, -width-2, BlockType.Brick);

        put(pw, py, width+1, BlockType.Brick);
        put(pw, py-1, width+1, BlockType.Brick);
        put(pw, py-1, width+2, BlockType.Brick);
      }

      put(-width-1, py+1, 2, BlockType.Brick);
      put(-width-2, py, 2, BlockType.Brick);
      put(-width-1, py+1, -2, BlockType.Brick);
      put(-width-2, py, -2, BlockType.Brick);

      put(width+1, py+1, 2, BlockType.Brick);
      put(width+2, py, 2, BlockType.Brick);
      put(width+1, py+1, -2, BlockType.Brick);
      put(width+2, py, -2, BlockType.Brick);

      put(2, py+1, -width-1, BlockType.Brick);
      put(2, py, -width-2, BlockType.Brick);
      put(-2, py+1, -width-1, BlockType.Brick);
      put(-2, py, -width-2, BlockType.Brick);

      put(2, py+1, width+1, BlockType.Brick);
      put(2, py, width+2, BlockType.Brick);
      put(-2, py+1, width+1, BlockType.Brick);
      put(-2, py, width+2, BlockType.Brick);
    }
  }

  /// Adds the 3Dart text to the world.
  void _add3Dart() {
    final int x = -12, y = 40, z = -25;
    final int xWidth = 24, zWidth = 3;

    if ((this._curChunk.x + Constants.chunkSideSize < x - xWidth) || (this._curChunk.x > x + xWidth) ||
        (this._curChunk.z + Constants.chunkSideSize < z - zWidth) || (this._curChunk.z > z + zWidth))
      return;

    var put = (int value, int dx, int dy, List<int> px, List<int> py) {
      for (int i = px.length -1; i >= 0; i--) {
        this._curChunk.setBlock(x + dx + px[i] - this._curChunk.x, y + dy - py[i], z - this._curChunk.z, value);
      }
    };

    put(BlockType.RedShine, 0, 0, // 3
      [0, 1, 2, 3, 4, 4, 3, 2, 4, 4, 3, 2, 1, 0],
      [1, 0, 0, 0, 1, 2, 3, 3, 4, 5, 6, 6, 6, 5]);
    put(BlockType.RedShine, 6, 0, // D
      [0, 1, 2, 3, 4, 4, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1]);
    put(BlockType.BlackShine, 12, 0, // A
      [0, 0, 0, 0, 0, 1, 2, 1, 2, 3, 3, 3, 3, 3],
      [2, 3, 4, 5, 6, 1, 1, 4, 4, 2, 3, 4, 5, 6]);
    put(BlockType.BlackShine, 17, 0, // R
      [0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 3, 3, 3, 3],
      [1, 2, 3, 4, 5, 6, 1, 1, 4, 4, 2, 3, 5, 6]);
    put(BlockType.BlackShine, 22, 0, // T
      [0, 2, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 2, 3, 4, 5, 6]);
  }

  /// Adds the RT tribute, "the tower of pimps", to the world.
  void _towerOfPimps() {
    final int x = 0, y = 2, z = 0;
    final int xWidth = 3, zWidth = 3, height = 7;

    if ((this._curChunk.x + Constants.chunkSideSize < x - xWidth) || (this._curChunk.x > x + xWidth) ||
        (this._curChunk.z + Constants.chunkSideSize < z - zWidth) || (this._curChunk.z > z + zWidth))
      return;

    var put = (int dx, int dy, int dz, int value) {
      this._curChunk.setBlock(dx - this._curChunk.x, dy, dz - this._curChunk.z, value);
    };

    for (int px = -xWidth; px <= xWidth; px++) {
      for (int py = 0; py <= height; py++) {
        for (int pz = -zWidth; pz <= zWidth; pz++) {
          put(x + px, y + py, z + pz, BlockType.Air);
        }
      }
    }

    put(x, y,   z, BlockType.BlackShine);
    put(x, y+1, z, BlockType.YellowShine);
    put(x, y+2, z, BlockType.YellowShine);
    put(x, y+3, z, BlockType.YellowShine);
    put(x, y+4, z, BlockType.YellowShine);
  }
}
