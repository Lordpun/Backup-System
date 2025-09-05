def getFilePaths():
	with open("backupPath.txt") as paths:
		for item in paths:
			print(item)
		paths.close

getFilePaths()