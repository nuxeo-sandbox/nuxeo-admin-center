/*
Using "Java in JavaScript" to avoid depending on a plugin for just fetching environment info.
This code is basically the same as what the old JSF Admin Center was doing.
*/
function run(input, params) {
  
  var envInfo, System, Runtime;
    
  System = java.lang.System;
  Runtime = java.lang.Runtime.getRuntime();
  
  try {
    envInfo = {
      "os": System.getProperty("os.name") + " (" +System.getProperty("os.arch") + ")",
      "cpus": Runtime.availableProcessors(),
      "jvm": System.getProperty("java.runtime.name") + " " + System.getProperty("java.runtime.version"),
      "jvmBuild": System.getProperty("java.vm.version") + " (" + System.getProperty("java.vendor") + ")",
      
      "platformLanguage": System.getProperty("user.language") + " (" + System.getenv("LANG") + ")",
      
      "memHeap": formatSize(Runtime.totalMemory()),
      "memFree": formatSize(Runtime.freeMemory()),
      "memUsed": formatSize(Runtime.totalMemory() - Runtime.freeMemory()),
      "memMax": formatSize(Runtime.maxMemory()),
      
      "uptime": getUptime(),
      
      "repositories": getRepositories(),
      
      "clusterOn": Env["nuxeo.cluster.enabled"] === "true",
      "clusterNodeId": Env["nuxeo.cluster.nodeid"]
    };
    
    envInfo.status = "OK";
    
  } catch (err) {
    Console.error("ERROR±:" + err);
    envInfo = {
      "status": "KO",
      "errMsg": "" + err
    };
  }
 
  return org.nuxeo.ecm.core.api.Blobs.createJSONBlob(JSON.stringify(envInfo));

}

function formatSize(size) {
  var units = ["B", "KB", "MB", "GB", "TB"];
  var index = 0;
  var formattedSize = size;
  while (formattedSize > 1024 && index < units.length - 1) {
    formattedSize /= 1024;
    index++;
  }
  return "" + formattedSize.toFixed(2) + " " + units[index];
}

function getUptime() {
  
  var bean, ut, uts, nbDays, nbHours, nbMin, uptime;
  
  bean = java.lang.management.ManagementFactory.getRuntimeMXBean();
  ut = ut = bean.getUptime();
  uts = Math.floor(ut / 1000);
  
  uptime = "";
  
  nbDays = Math.floor(uts / (24 * 3600));
  if (nbDays >= 1) {
    uptime += nbDays + " days, ";
    uts = uts % (24 * 3600);
  }
  
  nbHours = Math.floor(uts / 3600);
  uptime += nbHours + "h ";
  uts = uts % 3600;
  
  nbMin = Math.floor(uts / 60);
  uptime += nbMin + "m ";

  uts = uts % 60;
  uptime += uts + "s";
  
  return uptime;
}

function getRepositories() {
  
  var i, repositoryManager, repositoriesJavaCollection, repositoriesJavaArray, repositories, defaultRepo;
  
  repositoryManager = org.nuxeo.runtime.api.Framework.getService(org.nuxeo.ecm.core.api.repository.RepositoryManager.class);
  repositoriesJavaCollection = repositoryManager.getRepositories();
  
  repositories = [];
  // Convert repositoriesJavaCollection to JS array
  repositoriesJavaArray = repositoriesJavaCollection.toArray();
  for(i = 0; i < repositoriesJavaArray.length; i++) {
    repositories.push(repositoriesJavaArray[i].name);
  }
  
  defaultRepo = repositoryManager.getDefaultRepositoryName();
  
  return {
    "repositories": repositories,
    "defaultRepo": defaultRepo
  };
  
}

