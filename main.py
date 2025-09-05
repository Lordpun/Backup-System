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