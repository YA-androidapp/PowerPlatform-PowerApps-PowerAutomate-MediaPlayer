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

    this.attributeOnChange = function (executionContext) {
        var formContext = executionContext.getFormContext();

        const fileValue = formContext.getAttribute("ya_file").getValue();
        if (fileValue) {
            console.log("fileValue", fileValue)
            fetch(fileValue.fileUrl)
                .then(res => res.blob())
                .then(blob => {
                    console.log("blobData", blob)

                    var reader = new FileReader()
                    reader.onload = function () {
                        const mp3tag = new MP3Tag(reader.result)
                        mp3tag.read()
                        console.log("mp3tag.tags", mp3tag.tags)

                        if (mp3tag.tags) {
                            formContext.getAttribute("ya_title").setValue(mp3tag.tags.title)
                            formContext.getAttribute("ya_artist").setValue(mp3tag.tags.artist)
                            formContext.getAttribute("ya_album").setValue(mp3tag.tags.album)
                            formContext.getAttribute("ya_tracknumber").setValue(Number(mp3tag.tags.track))
                            formContext.getAttribute("ya_year").setValue(mp3tag.tags.year)
                            formContext.getAttribute("ya_genre").setValue(mp3tag.tags.genre)
                        }
                    };
                    reader.readAsArrayBuffer(blob)
                })
        }
    }

    // Code to run in the form OnSave event
    this.formOnSave = function () {
        // Display an alert dialog
        /// Xrm.Navigation.openAlertDialog({ text: "Record saved." });
    }
}).call(Yugi);