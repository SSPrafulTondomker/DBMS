r = []
def fun(r, s) :

	c = 0
	for i in r :
		l = i 
		flag = 0
		for j in range (len(l)) :
			if len(l) >= 2 and l[j] in s :
				flag = 1 
		if flag == 1 :
			c += 1
	print c

for _ in range (input()) :

	l = raw_input().split()
	r.append(l)
	s = "chef"
	flag = 0 
	



