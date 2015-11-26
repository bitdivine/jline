jline Troubleshooting
=====================

## Problem: jline-* not found
### Find out where this SHOULD have been installed:

	$ ls "$(npm config get prefix)/bin/jline-pretty"

If that says "no such file or directory" then jline has not been installed globally.  Run this and try again:

	$ npm install -g jline

Problem solved?  Great.  No?  Then we have to make sure that jline is in your path.  You have choices:

### Option:  Add the npm bin directory to your path:

You can find out your npm bin directory by running:

	$ echo "$(npm config get prefix)/bin"

Add whatever that pops out to your `PATH` in your `~/.bashrc` file:

	export PATH="$PATH:/THE_NPM_BIN"

### Option: Put the npm binaries in a standard place:

I prefer my select few globally installed npm programs to live in `/usr/local/bin`.  That used to be the default but it was changed, probably as a sane precaution against accidental or malicious damage.  If you want the classic approach, run:

	$ npm config get prefix
	$ npm config set prefix /usr/local -g
	$ npm config get prefix



