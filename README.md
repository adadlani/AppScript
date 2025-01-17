# AppScript

Steps to integrate with Google Sheets
- npm install @google/clasp -g
- clasp login #Login to GWorkspace
- New: clasp create --type sheets or Clone: clasp clone <scriptId> # Creates AppScript project
- git init # Initial current working directory as a repo
- git remote add origin <git_repo_url> # First create the repo on GitHub
- git add . # Add local files
- git commit -m "Msg"
- git push origin {main|master}
- git pull origin {main|master}
- clasp push
