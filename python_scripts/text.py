import sys
import json
args = sys.argv
actionItems = { "type":args[1],"data":args[2]}
print json.dumps(actionItems)
sys.stdout.flush()
