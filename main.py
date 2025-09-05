def getBackupPaths():
	pathList = []

	with open("backupPath.txt") as paths:
		for line in paths:
			pathList.append(line.strip())
		paths.close()

	return pathList;


paths = getBackupPaths();
print(paths)