/*
We try to filter passwords and keys based on the name of the parameter.

WARNING: We may miss some custom values, so they may be sent as clear text.

See algorithm below (check if a parameter contains "password", "pwd", "key")
*/
function run(input, params) {
  
  var props, javaKeys, key, value, json, text, blob, zip, fileName;
  
  props = org.nuxeo.runtime.api.Framework.getProperties();
  // Props is a java.util.Properties
  //    - Get the keys (a java Enumeration<?>)
  javaKeys = props.keys();
  //.   - Loop on each key
  json = [];
  while (javaKeys.hasMoreElements()) {
    key = javaKeys.nextElement();
    value = props.getProperty(key);
    
    if(key.indexOf("password") > -1 || key.indexOf("pwd") > -1 || key.indexOf("key") > -1) {
      value = "***";
    }
    
    json.push({
      "key": key,
      "value": value
    });
  }
  
  json.sort(function(a, b) {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  });
  
  fileName = (new Date()).toISOString().replace(/:/g, "-").substring(0, 16) + "-conf";
  if(ctx.ChainParameters && ctx.ChainParameters["asJson"]) {
    //Console.log("\n" + JSON.stringify(json, null, 2));
    blob = org.nuxeo.ecm.core.api.Blobs.createJSONBlob(JSON.stringify(json));
    fileName += ".json";
  } else {
    text = "";
    json.forEach(function(oneConf) {
      text += oneConf.key + "=" + oneConf.value + "\n";
    });
    //Console.log("\n" + text);
    blob = org.nuxeo.ecm.core.api.Blobs.createBlob(text);
    fileName += ".txt";
  }
  blob.setFilename(fileName);
  
  zip = Blob.CreateZip(
    blob, {
	'filename': fileName + ".zip"
    }
  );
  
  return zip;
}