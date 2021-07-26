var camInput = document.getElementById('cameraButton');
var tagId = "";
var tagText = "";

function uploadTag() {
  tagText = document.getElementById('tagText').value
  console.log(tagText);
  sendTagRequest();
}

const sendTagRequest = async () => {

  let body = {
    id: tagId,
    message: tagText,
    date: Date.now().toString()
  }

  const response = await fetch('https://rib0pfi622.execute-api.eu-west-1.amazonaws.com/dev/tag', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const status = await response.ok
  console.log(status);
}


function uploadImage() {
  var file = camInput.files[0];
  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", uploadProgress, false);
  xhr.addEventListener("load", uploadComplete, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("PUT", "https://rib0pfi622.execute-api.eu-west-1.amazonaws.com/dev/tag/image");
  xhr.send(file);
}

function uploadProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    document.getElementById('progress').innerHTML = percentComplete.toString() + '%';
  }
  else {
    document.getElementById('progress').innerHTML = 'Upload error!';
  }
}
function uploadComplete(evt) {

  let response = JSON.parse(evt.target.responseText);
  tagId = response.id;
}

function uploadFailed(evt) {
  console.log(evt);
}

function uploadCanceled(evt) {
  console.log("Upload cancelled by the user or network error!");
}

camInput.addEventListener('change', uploadImage, false);
