# nuxeo-admin-center

This project adds administrative functions to [Nuxeo Web UI](https://doc.nuxeo.com/n/y8x) via the [Administration menu](https://doc.nuxeo.com/n/HMi). This interface was created primarily to replace <a href="https://doc.nuxeo.com/n/9CF" target="_blank">Nuxeo JSF UI Admin features</a>, but includes several enhancements as well.

This interface is similar to the [Nuxeo Admin Console](https://doc.nuxeo.com/n/WYr) but is based on Google Polymer and integrates with Nuxeo Web UI.

This repository contains a [Nuxeo Studio](https://doc.nuxeo.com/n/dqH) Project to be used as a [multi-layer](https://doc.nuxeo.com/n/LVQ) dependency. The code is being stored in GitHub using the [External Source Repository](https://doc.nuxeo.com/n/ZB4) feature.

# Usage

Once installed, a new menu item is available under the Administration menu in Web UI named "Admin Center".

# Configuration

You may contribute additional Admin Center items via the `ADMIN_CENTER` slot.

You can use the included `nxpac-basic-action` element for simple actions that only need to call an operation, e.g.

```HTML
<nuxeo-slot-content name="adminCenter_downloadServerLog"
                    slot="ADMIN_CENTER">
  <template>
    <nxpac-basic-action label="nxpac.label.action.download-log"
                        description="nxpac.label.description.download-log"
                        operation="javascript.adminCenter_downloadServerLog"
                        download
                        async
                        notification="nxpac.label.notification.download-log">
    </nxpac-basic-action>
  </template>
</nuxeo-slot-content>
```

All the normal features of the `nuxeo-operation-button` element are available.

For custom contributions, it’s recommended to surround your contribution with a nuxeo-card, e.g.:

```HTML
<nuxeo-slot-content name="adminActionOne" slot="ADMIN_CENTER">
  <template>
    <nuxeo-card>
      <!-- Your stuff -->
    </nuxeo-card>
  </template>
</nuxeo-slot-content>
```

Of course you can use your own custom element as well.
