let canvas = new fabric.Canvas('canvas',{
    width: window.innerWidth,
    height: window.innerHeight
});
let uploadFile = document.getElementById('file');
uploadFile.addEventListener("change", addFileOnCanvas);

function addFileOnCanvas(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
      var data = f.target.result;                    
      fabric.Image.fromURL(data, function (img) {                 
        var oImg = img.set({left: 0, top: 50}).scale(0.9);
        oImg.scaleToWidth(400);
        canvas.add(oImg).renderAll();
        var a = canvas.setActiveObject(oImg);
        var dataURL = canvas.toDataURL({format: 'jpg', quality: 0.8});       
      });
    };
    reader.readAsDataURL(file);
  }

  canvas.on('mouse:wheel', zoomImage);

  function zoomImage(opt){
    var target = canvas.findTarget(opt);    
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    
    zoom *= 0.999 ** delta;
    if((delta > 0) && (zoom < 1)){
      zoom = 1;
    }
    canvas.zoomToPoint(
      new fabric.Point(opt.e.offsetX, opt.e.offsetY),
      zoom,
  );
    //canvas.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  }

  // canvas.on('mouse:down', function(opt) {
  //   var evt = opt.e;
  //   if (evt.altKey === true) {
  //     this.isDragging = true;
  //     this.selection = false;
  //     this.lastPosX = evt.clientX;
  //     this.lastPosY = evt.clientY;
  //   }
  // });
  // canvas.on('mouse:move', function(opt) {
  //   if (this.isDragging) {
  //     var e = opt.e;
  //     var vpt = this.viewportTransform;
  //     vpt[4] += e.clientX - this.lastPosX;
  //     vpt[5] += e.clientY - this.lastPosY;
  //     this.requestRenderAll();
  //     this.lastPosX = e.clientX;
  //     this.lastPosY = e.clientY;
  //   }
  // });
  // canvas.on('mouse:up', function(opt) {
  //   // on mouse up we want to recalculate new interaction
  //   // for all objects, so we call setViewportTransform
  //   this.setViewportTransform(this.viewportTransform);
  //   this.isDragging = false;
  //   this.selection = true;
  // });