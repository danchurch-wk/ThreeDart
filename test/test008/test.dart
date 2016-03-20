// Copyright (c) 2016, SnowGremlin. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

library ThreeDart.test.test008;

import 'dart:html';
import 'dart:web_gl' as WebGL;

import 'package:ThreeDart/ThreeDart.dart' as ThreeDart;
import 'package:ThreeDart/Shapes.dart' as Shapes;
import 'package:ThreeDart/Shaders.dart' as Shaders;
import 'package:ThreeDart/Movers.dart' as Movers;
import 'package:ThreeDart/Math.dart' as Math;
import 'package:ThreeDart/Data.dart' as Data;
import 'package:ThreeDart/Techniques.dart' as Techniques;
import 'package:ThreeDart/Textures.dart' as Textures;
import 'package:ThreeDart/Scenes.dart' as Scenes;

part 'BumpyShader.dart';
part 'BumpyTechnique.dart';

void main() {
  Shapes.Shape shape = Shapes.grid(widthDiv: 50, heightDiv: 50);
  shape.calculateNormals();
  shape.calculateBinormals();
  shape.faces.removeAll();
  for (int i = shape.vertices.length-1; i >= 0; i--) {
    Shapes.Vertex ver1 = shape.vertices[i]
      ..weight = 0.0;
    Shapes.Vertex ver2 = ver1.copy()
      ..weight = 1.0;
    shape.vertices.add(ver2);
    shape.lines.add(ver1, ver2);
  }

  BumpyTechnique tech = new BumpyTechnique()
    ..offsetScalar = 0.5;

  ThreeDart.Entity objTech = new ThreeDart.Entity()
    ..shape = shape
    ..technique = tech;

  Movers.UserRotater rotater = new Movers.UserRotater();
  Movers.UserZoom zoom = new Movers.UserZoom();

  ThreeDart.Entity group = new ThreeDart.Entity()
    ..children.add(objTech)
    ..mover = (new Movers.Group()
      ..add(rotater)
      ..add(zoom));

  Scenes.RenderPass pass = new Scenes.RenderPass()
    ..children.add(group)
    ..camara.mover = new Movers.Constant(new Math.Matrix4.translate(0.0, 0.0, 5.0));

  ThreeDart.ThreeDart td = new ThreeDart.ThreeDart.fromId("threeDart")
    ..scene = pass;

  tech.bumpyTexture = td.textureLoader.load2DFromFile("./BumpMap.png");
  rotater.attach(td.userInput);
  zoom.attach(td.userInput);

  var update;
  update = (num t) {
    td.render();
    window.requestAnimationFrame(update);
  };
  window.requestAnimationFrame(update);
}