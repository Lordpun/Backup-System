import backupFuncs
import os
import time

def clearConsole(waitVal=0):
	time.sleep(waitVal)
	# Should work on both Linux and Windows
	os.system('cls' if os.name == 'nt' else 'clear')

def exitToMenu():
	print("\033[35mExiting to main menu\033[0m")
	clearConsole(0.75)
	consoleMenuStart();

def consoleMenuStart():
	print("\033[34mBACKUPS\n\033[0m")

	print("Choose an option\n\033[90m1] Initalize backup system\n2] Add a path to backup\n3] Remove a path\n4] Manual backup\n5] Exit\n\033[0m")

	options = {
		"1": "init",
		"2": "add",
		"3": "remove",
		"4": "backup",
		"5": "quit"
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
				case "init":
					return "init"
				case "add":
					return "add"
				case "remove":
					return "remove"
				case "backup":
					return "backup"
				case "quit":
					return "quit"
				case _:
					# It's not a good program if there's no error message making fun of you.
					print("\033[31mError\033[0m: Uh oh, that case shouldn\'t have been reached at all!\nThis may sound a bit rude, but you may be an idiot if you managed to get here without modifiying the code.")
			
# Made to get around the break statement in the inner for loop exiting to the main for loop rather than both loops
def setupLocation2(path):
	backupFuncs.setBackupLocation(path)
	clearConsole(1);

def setupLocation():
	path = ""

	while True:
		path = input("Enter a path to save backups:\n")

		if os.path.isdir(path):
			print(f"\033[35mPath selected as {path}\033[0m")
			break;

		while True:
			answer = input("\033[35mPath does not exist, make the file?\033[0m").lower()
			if answer == "y" or answer == "yes":
				print("Making file...")
				try:
					os.makedirs(path)
				except:
					print(f"\033[31mError\033[0m: {path} isn't valid")
				else:
					print(f"\033[35mMade the path {path})\033[0m")
					setupLocation2(path)
					return
			else:
				break
	setupLocation2(path)
	
def addSavePaths():
	while True:
		path = input("Enter a path you wish to backup (exit to quit):\n")

		if path.lower() == "exit":
			exitToMenu()
			return;

		if not os.path.isdir(path):
			print("\033[35mThis path doesn't exist.\033[0m")
		else:
			backupFuncs.addBackupPath(path)

inputVal = consoleMenuStart()

clearConsole(0.25)

match inputVal:
	case "init":
		setupLocation()
	case "add":
		addSavePaths()
	case "exit":
		pass