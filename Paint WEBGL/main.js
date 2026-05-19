document.addEventListener('DOMContentLoaded', function() {
  // WebGL
  var mainView = document.getElementById('mainView');

  // Criar a tela
  var scene = new THREE.Scene();

  // Criar a camera
  var camera = new THREE.PerspectiveCamera(75, mainView.offsetWidth / mainView.offsetHeight, 0.1, 1000);

  // Create the place to render
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(mainView.offsetWidth, mainView.offsetHeight);
  mainView.appendChild(renderer.domElement);

  var shape;
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // Posição da camera
  camera.position.z = 5;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer.render(scene, camera);

  var mode = function(geometry) {
    material.side = THREE.DoubleSide;
    return new THREE.Mesh(geometry, material);
  };

  // NUMERAÇÃO DA TECLA
  var upArrow = 38;
  var downArrow = 40;
  var leftArrow = 37;
  var rightArrow = 39;

  // TRANSLATION HANDLERS
  var Akey = 65;
  var Dkey = 68;
  var Wkey = 87;
  var Skey = 83;

  // BOTOES DE ROTAÇÃO
  var Ukey = 85;
  var Okey = 79;

  document.addEventListener('keydown', function(event) {
    if (!shape) return;
    event.preventDefault();
    switch (event.which) {
      // Translate
      case Wkey:
        shape.position.y += 0.1;
        break;
      case Skey:
        shape.position.y -= 0.1;
        break;
      case Akey:
        shape.position.x -= 0.1;
        break;
      case Dkey:
        shape.position.x += 0.1;
        break;
      // Rotate
      case Ukey:
        shape.rotation.z += 0.1;
        break;
      case Okey:
        shape.rotation.z -= 0.1;
        break;
      // Scale
      case leftArrow:
        shape.scale.x = Math.max(0.1, shape.scale.x - 0.1);
        break;
      case rightArrow:
        shape.scale.x += 0.1;
        break;
      case upArrow:
        shape.scale.y += 0.1;
        break;
      case downArrow:
        shape.scale.y = Math.max(0.1, shape.scale.y - 0.1);
        break;
      default:
        return;
    }
    renderer.render(scene, camera);
  });

  function setColor(hex) {
    material = new THREE.MeshBasicMaterial({ color: hex, side: THREE.DoubleSide });
    if (shape) {
      shape.material = material;
      renderer.render(scene, camera);
    }
  }

  // COLOR BUTTONS HANDLERS
  document.querySelector('.branco').addEventListener('click', function() { setColor(0xFFFFFF); });
  document.querySelector('.cinza').addEventListener('click', function()   { setColor(0x808080); });
  document.querySelector('.preto').addEventListener('click', function()   { setColor(0x000000); });
  document.querySelector('.azul').addEventListener('click', function()    { setColor(0x0000FF); });
  document.querySelector('.amarelo').addEventListener('click', function() { setColor(0xFFFF00); });
  document.querySelector('.verde').addEventListener('click', function()   { setColor(0x00FF00); });
  document.querySelector('.rosa').addEventListener('click', function()    { setColor(0xFF00FF); });
  document.querySelector('.ciano').addEventListener('click', function()   { setColor(0x00FFFF); });
  document.querySelector('.vermelho').addEventListener('click', function(){ setColor(0xFF0000); });

  function addShape(mesh) {
    scene.add(mesh);
    shape = mesh;
    renderer.render(scene, camera);
  }

  // SHAPE BUTTON HANDLERS
  document.querySelector('.reta').addEventListener('click', function() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-2, 0, 0));
    geometry.vertices.push(new THREE.Vector3(2, 0, 0));
    var line = new THREE.LineSegments(geometry, material);
    addShape(line);
  });

  document.querySelector('.triangulo').addEventListener('click', function() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-2, -2, 0));
    geometry.vertices.push(new THREE.Vector3(2, -2, 0));
    geometry.vertices.push(new THREE.Vector3(0, 2, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.computeFaceNormals();
    addShape(mode(geometry));
  });

  document.querySelector('.quadrado').addEventListener('click', function() {
    var geometry = new THREE.PlaneGeometry(2, 2);
    addShape(mode(geometry));
  });

  document.querySelector('.trapezio').addEventListener('click', function() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-2, 0, 0));
    geometry.vertices.push(new THREE.Vector3(2, 0, 0));
    geometry.vertices.push(new THREE.Vector3(1, 2, 0));
    geometry.vertices.push(new THREE.Vector3(-1, 2, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.computeFaceNormals();
    addShape(mode(geometry));
  });

  document.querySelector('.pentagono').addEventListener('click', function() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 2, 0));
    geometry.vertices.push(new THREE.Vector3(-2, 0.5, 0));
    geometry.vertices.push(new THREE.Vector3(-1, -2, 0));
    geometry.vertices.push(new THREE.Vector3(1, -2, 0));
    geometry.vertices.push(new THREE.Vector3(2, 0.5, 0));
    geometry.faces.push(new THREE.Face3(1, 2, 3));
    geometry.faces.push(new THREE.Face3(1, 3, 4));
    geometry.faces.push(new THREE.Face3(1, 4, 0));
    geometry.computeFaceNormals();
    addShape(mode(geometry));
  });

  document.querySelector('.circulo').addEventListener('click', function() {
    var geometry = new THREE.CircleGeometry(2, 100);
    addShape(mode(geometry));
  });
});
