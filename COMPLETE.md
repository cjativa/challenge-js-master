Hello!

This repository contains the completed code for the `challenge-js-master` implementation spec. 

1. Reimplement `addVersion` (see `src/api.js`) in order to insert each new
   version on the beginning of the stack (currently, each new version is pushed
   at the end of the stack).
   
   **This task has been completed. Each new version is added to the beginning of the version list.**
   
2. Using React APIs, keep the file list up to date by refreshing it only when
   the list is changed.
   
   **This task has been completed. The list refreshes when a rename has occurred, and when a new file has been added to the overall list**
   
3. Sort the file list when the user clicks "Sort A-Z/Z-A" button.
    - The list should be sorted A-Z during the first render.
    - The button label should be "Sort Z-A" when the list is sorted "A-Z" and
      "Sort A-Z" otherwise.
      
    **This task has been completed. The list sorts "A - Z" on the initial rendering of the app. You can then toggle to sort from "Z - A" and switch between the two.**
    **When a new file has been added, or a rename has occurred, the list contents are refreshed and the list is sorted per the desired sort setting, with that new file, or version, being correctly sorted in the list.**
    
    **Note: Sorts currently use the name of the latest version of each file to determine the sort order, not the file id. If this is incorrect let me know.**
      
4. Check the implementation of `File` component (see `src/Files/index.js`) and
   add any improvement that you consider (there's no need to improve the
   styles).
   
   **This task has been completed.**
   
5. Implement a feature to add files to the list. A new file object should be
   created from a filename (a non-empty `string`) provided by the user.
    - Implement `addFile` API (see `src/api.js`).
    - Add a button below the file list to create a new file. The UI should only
      require the filename to the user (you can use the simplest approach to
      ask the filename).
    - The file list should be refreshed once the file gets created.
    
    **This task has been completed. A new file can be added and the list is then sorted once the new file has been added. The new file also does have the correct file id, meaning it has a file of "the-file-id-X" where X is the increment of the pre-existing latest file.**
    
# Additional

I did add styling into the application. I know this is not part of the requirements, but I have no problem going the extra mile to create a nice and enjoyable UI.

I also added indicators of the current number of revisions a file has had, as well as display the id of that file. There is also an indicator that denotes which file version is the latest.

I also did add each of the API functions into a module called APIFunctions in order to make it easier to manage and import/export functions of the API by being able to import the module as a whole, rather than having to import each individual function.

Lastly, I also added the ability to delete an existing file, and then start the list again from scratch. Feel free to try it out.

I deployed this online as well and you can take a look here [Challenge JS Master](https://Create-React-App--cjativa1.repl.co).

If, for whatever reason that link is not available, you can just pull down this source code and run `yarn start`

Thank you!