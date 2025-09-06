def getBackupPaths():
	pathList = []

	with open("backupPath.txt") as paths:
		for line in paths:
			pathList.append(line.strip())
		paths.close()

	return pathList;

def getBackupLocation():
	locationPath = ""

	with open("savePaths.txt", "r") as location:
		locationPath = location.readLine().strip();
	location.close()

	if locationPath == "":
		return "\033[31mError\033[0m: Empty path!, please run the initalize option first."

	return locationPath

def addBackupPath(path):
	with open("backupPath.txt", "a") as paths:
		paths.write(path)
	paths.close()

def removeBackupPath(path):
	# There was probably a much simpler way to remove a line, but oh well.

	# Turning text into an array
	with open("backupPath.txt", "r") as paths:
		pathsText = paths.readLines()
	paths.close()

	# Finding the path and removing it
	for item in pathsList:
		if item.strip() == path:
			pathIndex = pathsText.index(item)
			pathsText.pop(pathIndex)

	# wiping the paths file
	with open("backupPath.txt", "w") as paths:
		pass
	paths.close();

	# Rewriting the content
	with open("backupPath.txt", "a") as paths:
		for item in pathsText:
			paths.write(item)
	paths.close()

def consoleMenuStart():
	print("\033[34mBACKUPS\n\033[0m")

	print("Choose an option\n\033[90m1] Initalize backup system\n2] Add a path to backup\n3] Remove a path\n4] Manual backup\n\033[0m")

	options = {
		"1": "init",
		"2": "add",
		"3": "remove",
		"4": "backup"
	}

	# Option input loop
	while True:
		userInput = str(input()).lower()

		try:
			option = options[userInput]
		except:
			print("\033[31mPlease enter a listed number\033[0m")
		else:
			match option:
				case "exit":
					return "Exited Loop"
				case "init":
					return "Option: init"
				case "add":
					return "Option: add"
				case "remove":
					return "Option: remove"
				case "backup":
					return "Option: backup"
				case _:
					# It's not a good program if there's no error message making fun of you.
					print("\033[31mError\033[0m: Uh oh, that case shouldn\'t have been reached at all, what did you even do?.\nThis may sound a bit rude, but you may be an idiot if you managed to get here without modifiying the code.")
			
inputVal = consoleMenuStart()