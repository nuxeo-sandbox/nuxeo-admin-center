/*
Using Java in JS to get the log via a Java File
*/
function run(input, params) {
  
  var logPath, logFile, logBlob, zip;
  
  logPath = org.nuxeo.runtime.api.Framework.getProperty(/*Environment.NUXEO_LOG_DIR*/"nuxeo.log.dir");
  if(logPath.charAt(logPath.length - 1) !== "/") {
    logPath += "/";
  }
  logPath += "server.log";
  
  logFile = new java.io.File(logPath);
  logBlob = new org.nuxeo.ecm.core.api.impl.blob.FileBlob(logFile);
  (new Date()).toISOString().replace(/:/g, "-");
  zip = Blob.CreateZip(
    logBlob, {
	'filename': (new Date()).toISOString().replace(/:/g, "-") + "-server.log.zip"
    }
  );
  
  return zip;

}