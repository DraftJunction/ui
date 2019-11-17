export const getCameras = async () =>
  navigator.mediaDevices
    .enumerateDevices()
    .then(devices => devices.filter(device => device.kind === "videoinput"));

export const getConstraints = async () => {
  let final = null;
  const cameras = await getCameras();

  for (let i = 0; i < cameras.length; i++) {
    if (
      cameras[i].facingMode === "environment" ||
      cameras[i].label.indexOf("back") >= 0
    ) {
      final = cameras[i];
      break;
    }
  }
  if (final === null) {
    final = cameras[cameras.length - 1];
  }
  return {
    audio: false,
    video: {
      deviceId: { exact: final.deviceId }
    }
  };
};
