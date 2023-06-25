var Yugi = window.Yugi || {};
(function () {
    // Define some global variables
    var myUniqueId = "_myUniqueId"; // Define an ID for the notification
    var currentUserName = Xrm.Utility.getGlobalContext().userSettings.userName; // get current user name
    var message = currentUserName + ": Your JavaScript code in action!";

    // Code to run in the form OnLoad event
    this.formOnLoad = function (executionContext) {
        var formContext = executionContext.getFormContext();

        // Display the form level notification as an INFO
        /// formContext.ui.setFormNotification(message, "INFO", myUniqueId);

        // Wait for 5 seconds before clearing the notification
        /// window.setTimeout(function () { formContext.ui.clearFormNotification(myUniqueId); }, 5000);
    }

    // Code to run in the column OnChange event
    this.attributeOnChange = function (executionContext) {
        var formContext = executionContext.getFormContext();

        // Automatically set some column values if the account name contains "Contoso"
        const fileValue = formContext.getAttribute("ya_file").getValue();
        if (fileValue) {
            console.log("fileValue", fileValue)
            fetch(fileValue.fileUrl)
                .then(res => {
                    console.log("res", res)
                    console.log("blob", res.blob())

                    var reader = new FileReader()
                    reader.onload = function () {
                        const mp3tag = new MP3Tag(reader.result)
                        mp3tag.read()
                        console.log(mp3tag.tags)
                    };
                    reader.readAsArrayBuffer(res.blob())
                })
            /// .catch(err => console.error(err.message));

            /// if (accountName.toLowerCase().search("contoso") != -1) {
            ///     formContext.getAttribute("websiteurl").setValue("https://www.contoso.com");
            ///     formContext.getAttribute("telephone1").setValue("425-555-0100");
            ///     formContext.getAttribute("description").setValue("Website URL, Phone and Description set using custom script.");
            /// }

        }
    }

    // Code to run in the form OnSave event
    this.formOnSave = function () {
        // Display an alert dialog
        /// Xrm.Navigation.openAlertDialog({ text: "Record saved." });
    }
}).call(Yugi);