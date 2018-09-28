part of craft;

/// A chunk represents the voxal information for a large number of blocks.
/// This makes up one of the many square areas of the world.
class Chunk {
  /// The offset to the left edge of the chunk.
  int _x;

  /// The offset to the front edge of the chunk.
  int _z;

  /// This is the world this chunk belongs to.
  World _world;

  /// The list of block information for this chunk.
  data.Uint8List _data;

  /// The entities for rendering all the different types of block textures.
  List<ThreeDart.Entity> _entities;

  /// Indicates if the chunk's entities need to be updated to reflect the chunk's data.
  bool _needUpdate;

  /// Indicates if the chunk hasn't been generated yet.
  bool _needGen;

  /// Creates a new chunk for the given [world].
  Chunk(this._world) {
    this._data = new data.Uint8List(Constants.chunkDataLength);
    this._entities = new List<ThreeDart.Entity>();
    for (ThreeDart.Entity parent in this._world.entities) {
      ThreeDart.Entity entity = new ThreeDart.Entity();
      parent.children.add(entity);
      this._entities.add(entity);
    }

    this._x = 0;
    this._z = 0;
    this._needUpdate = true;
    this._needGen = true;
  }

  /// Prepares this chunk for uses.
  void prepare(int x, int z) {
    this._x = x;
    this._z = z;
    this._needUpdate = true;
    this._needGen = true;
  }

  /// Makes this chunk available to be reused.
  void freeup() {
    this._enabled = false;
    this._needGen = true;
  }

  /// The offset to the left edge of the chunk.
  int get x => this._x;

  /// The offset to the front edge of the chunk.
  int get z => this._z;

  /// Gets the string for this chunk for debugging.
  @override
  String toString() => "chunk(${this._x}, ${this._z})";

  /// Gets the entities used for rendering this chunk.
  List<ThreeDart.Entity> get entities => this._entities;

  /// Gets or sets if this chunk needs an update.
  bool get needUpdate => this._needUpdate;
  set needUpdate(bool update) => this._needUpdate = update;
  
  /// Gets if this chunk needs to be generated.
  bool get needToGenerate => this._needGen;

  /// Indicates that the chunk is finished being generated.
  void finishGenerate() {
    this._needGen = false;
    this._needUpdate = true;
    this.left?.needUpdate = true;
    this.right?.needUpdate = true;
    this.front?.needUpdate = true;
    this.back?.needUpdate = true;
  }

  /// Calculates the chunk's data offset for the given x, y, and z location.
  int _index(int x, int y, int z) =>
    (x * Constants.chunkYSize + y) * Constants.chunkSideSize + z;

  /// Gets the value of the block at the given location.
  /// This will not check neighbors if the coordinates are outside this chunk.
  int getBlock(int x, int y, int z) {
    if (y < 0) return BlockType.Boundary;
    if ((y >= Constants.chunkYSize) ||
        (x < 0) || (x >= Constants.chunkSideSize) ||
        (z < 0) || (z >= Constants.chunkSideSize)) return BlockType.Air;
    return this._data[this._index(x, y, z)];
  }

  /// Gets the value of the block at the given location.
  /// If the coordinates are outside this chunk the neighboring chunk will checked.
  int getWorldBlock(int x, int y, int z) {
    if (y < 0)                        return BlockType.Boundary;
    if (y >= Constants.chunkYSize)    return BlockType.Air;
    if (x < 0)                        return left?. getWorldBlock(x + Constants.chunkSideSize, y, z) ?? BlockType.Air;
    if (x >= Constants.chunkSideSize) return right?.getWorldBlock(x - Constants.chunkSideSize, y, z) ?? BlockType.Air;
    if (z < 0)                        return back?. getWorldBlock(x, y, z + Constants.chunkSideSize) ?? BlockType.Air;
    if (z >= Constants.chunkSideSize) return front?.getWorldBlock(x, y, z - Constants.chunkSideSize) ?? BlockType.Air;
    return this._data[this._index(x, y, z)];
  }

  /// Sets the value of the block at the given location.
  /// This will not set neighbors if the coordinates are outside this chunk.
  /// Returns true if block set, false if not.
  bool setBlock(int x, int y, int z, int value) {
    if ((y < 0) || (y >= Constants.chunkYSize) ||
        (x < 0) || (x >= Constants.chunkSideSize) ||
        (z < 0) || (z >= Constants.chunkSideSize)) return false;
    this._data[this._index(x, y, z)] = value;
    return true;
  }

  /// Gets the chunk to the left (XNeg) of this chunk.
  Chunk get left => this._world.findChunk(this.x - Constants.chunkSideSize, this.z);

  /// Gets the chunk to the front (ZPos) of this chunk.
  Chunk get front => this._world.findChunk(this.x, this.z + Constants.chunkSideSize);

  /// Gets the chunk to the right (XPos) of this chunk.
  Chunk get right => this._world.findChunk(this.x + Constants.chunkSideSize, this.z);

  /// Gets the chunk to the back (ZNeg) of this chunk.
  Chunk get back => this._world.findChunk(this.x, this.z - Constants.chunkSideSize);

  /// Determines the highest non-air block in the given [x] and [z] column.
  /// If no ground is found then the given [defaultY] is returned.
  int topHit(int x, int z, [int defaultY = Constants.chunkYSize]) {
    for (int y = Constants.chunkYSize-1; y >= 0; y--) {
      if (BlockType.solid(this.getBlock(x, y, z))) return y;
    }
    return defaultY;
  }

  /// Updates the shapes in the entities for rendering this chucnk.
  void updateShape() {
    if (!this._needUpdate) return;
    this._needUpdate = false;
    Shaper shape = new Shaper(this._world.materials);
    shape.buildChunkShapes(this);
    shape.finish(this.entities);
  }

  /// Sets all of the entities to either enabled or disabled.
  void set _enabled(bool enabled) {
    for (ThreeDart.Entity entity in this._entities)
      entity.enabled = enabled;
  }

  /// Updates the visiblity of this chunk.
  void updateVisiblity(Math.Point2 loc, Math.Point2 front) {
    if (this._needGen) {
      this._enabled = false;
      return;
    }

    Math.Region2 aabb = new Math.Region2(this.x.toDouble(), this.z.toDouble(),
      Constants.chunkSideSize.toDouble(), Constants.chunkSideSize.toDouble());
    Math.Point2 nearLoc = aabb.nearestPoint(loc);
    if (nearLoc.distance2(loc) < Constants.minDrawDist2) {
      this._enabled = true;
      return;
    }

    Math.Point2 nearFront = aabb.nearestPoint(front);
    Math.Vector2 forward = new Math.Vector2(front.x - loc.x, front.y - loc.y).normal();
    Math.Vector2 toNear = new Math.Vector2(nearFront.x - loc.x, nearFront.y - loc.y);

    double length = toNear.length2();
    if (length > Constants.maxDrawDist2) {
      this._enabled = false;
      return;
    }

    toNear = toNear/length;
    double dot = forward.dot(toNear);
    bool enabled = dot > 0.0;
    this._enabled = enabled;
  }
}
