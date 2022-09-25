from PIL import Image
import numpy as np

output = ""
bt = open("bigtext.txt", 'w')

for i in range(93):
    fp = "images/pixil-layer-" + str(i+1) + ".png"
    
    img = Image.open(fp)
    img.load()
    
    img = np.asarray(img, dtype="int32")
    for l in range(5):
        for c in range(5):
        
            output += str(img[l][c][3] // 255)
        output += '\n'
    output += '\n'

print(output[0:30])
bt.write(output)
bt.close()

    