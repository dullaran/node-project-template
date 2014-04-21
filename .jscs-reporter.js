/**
 * @param {Errors[]} errorsCollection
 */
module.exports = function(errorsCollection) {
    var NUN_LENGHT = 7,
        MSG_LENGHT = 57,
        errorCount = 0;
    /**
     * Formatting every error set.
     */
    errorsCollection.forEach(function(errors) {
        var file = errors.getFilename();
        if (!errors.isEmpty()) {
            var errorList = errors.getErrorList();

            console.log("\n" +
                "-------------------------------------------------------------------------------\n" +
                " FILE: " + file + "\n" +
                "-------------------------------------------------------------------------------\n" +
                " FOUND: " + errorList.length + " ERROR(S)\n" +
                "-------------------------------------------------------------------------------\n" +
                " LINE    | COLUMN  | MESSAGE                                                   \n" +
                "+------------------------------------------------------------------------------"
            );

            errorList.forEach(function(error) {
                errorCount++;

                var messageLength = error.message.length,
                    blankField = '                                                          ';

                console.log(" %d%s | %d%s | %s%s ",
                    error.line,
                    blankField.substring(0, NUN_LENGHT - error.line.toString().length),
                    error.column,
                    blankField.substring(0, NUN_LENGHT - error.column.toString().length),
                    error.message.substring(0, MSG_LENGHT),
                    blankField.substring(0, MSG_LENGHT - messageLength)
                );

                if (messageLength > MSG_LENGHT) {
                    var numberLines = messageLength / MSG_LENGHT;
                    for (var line = 1; line < numberLines; line++) {
                        var subMessage =
                            error.message.substring(MSG_LENGHT * line, MSG_LENGHT * line + MSG_LENGHT);
                        console.log(" %s | %s | %s%s ",
                            blankField.substring(0, NUN_LENGHT),
                            blankField.substring(0, NUN_LENGHT),
                            subMessage,
                            blankField.substring(0, MSG_LENGHT - subMessage.length)
                        );
                    }
                }
            });
            console.log(
                "-------------------------------------------------------------------------------\n");
        }
    });
};
