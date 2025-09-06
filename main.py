def getBackupPaths():
	pathList = []

	with open("backupPath.txt") as paths:
		for line in paths:
			pathList.append(line.strip())
		paths.close()

	return pathList;

def getBackupLocation():
	locationPath = ""

	with open("savePaths.txt") as location:
		locationPath = location.readLine().strip();
	location.close()

	if locationPath == "":
		return "Error! Empty path!"

	return locationPath

def addBackupPath(path):
	with open("backupPath.txt", "a") as paths:
		paths.write(path)
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
					print("\033[31mError! We reached a case we shouldn't have reached.\033[0m")
			
inputVal = consoleMenuStart()