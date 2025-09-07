import backupFuncs

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
				case "init":
					return "init"
				case "add":
					return "add"
				case "remove":
					return "remove"
				case "backup":
					return "backup"
				case _:
					# It's not a good program if there's no error message making fun of you.
					print("\033[31mError\033[0m: Uh oh, that case shouldn\'t have been reached at all, what did you even do?.\nThis may sound a bit rude, but you may be an idiot if you managed to get here without modifiying the code.")
			
inputVal = consoleMenuStart()

match inputVal:
	case "init":
		backupFuncs.getBackupLocation();