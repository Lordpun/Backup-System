import os

# Paths file functions

def getBackupPaths():
	pathList = []

	with open("savePaths.txt") as paths:
		for line in paths:
			pathList.append(line.strip())
		paths.close()

	return pathList;

def addBackupPath(path):
	# Checking to see the file exists
	try:
		paths = open("savePaths.txt", "x")
		paths.close()
	except FileExistsError:
		pass

	with open("savePaths.txt", "a") as paths:
		path += "\n"
		paths.write(path)
	paths.close()

def removeBackupPath(path):
	# There was probably a much simpler way to remove a line, but oh well.

	# Turning text into an array
	with open("savePaths.txt", "r") as paths:
		pathsText = paths.readlines()
	paths.close()

	# Finding the path and removing it
	for item in pathsList:
		if item.strip() == path:
			pathIndex = pathsText.index(item)
			pathsText.pop(pathIndex)

	# wiping the paths file
	with open("savePaths.txt", "w") as paths:
		pass
	paths.close();

	# Rewriting the content
	with open("savePaths.txt", "a") as paths:
		for item in pathsText:
			paths.write(item)
	paths.close()

# Backup location functions

def getBackupLocation():
	locationPath = ""

	fileSize = os.path.getsize("backupPath.txt");
	if fileSize == 0:
		return "\033[31mError\033[0m: Empty path!, please run the initalize option first."

	with open("savePaths.txt", "r") as location:
		locationPath = location.readline().strip();
	location.close()

	return locationPath

def setBackupLocation(path):
	with open("savePaths.txt", "w") as pathSave:
		pathSave.write(path)
	pathSave.close()