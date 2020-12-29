This module was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Main app ui

Has two modes of work depending on `REACT_APP_UI_ONLY` environment variable.
If the variable is not present UI expects server to be up and running on the same host and some extra features will be available:
* authentication 
* uploading records to a cloud storage
* playing and downloading records from the storage


