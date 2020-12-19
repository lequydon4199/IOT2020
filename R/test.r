library(daewr)
library(mefa)

# dat thu muc lam viec mac dinh la o D
setwd("D:/")

# tinh do lech chuan su dung ket qua cua 3 lan do voi khoang cach 1 cm
sd(c(0.48, 0.42, 0.55))
# do lech chuan tinh duoc la: 0.06506407, lay tron len la 0.07 su dung trong thiet ke thi nghiem


# bien phu thuoc t2: nhiet do do duoc cua vat
# bien doc lap d: khoang cach tu sensor den coc nuoc
# bien quan sat: t1 (nhiet do moi truong)


# mot bang de ghi ket qua thi nghiem voi cac khoang cach do 0.5, 1.0 va 1.5 cm
expand.grid(d=c(0.5, 1.0, 1.5), t1=-275, t2=-275)

# thuc hien ham Fpower de xac dinh so lan lap
Fpower1(alpha = 0.05, nlev = 3, nreps = 3:12, Delta = 0.1, sigma = 0.07)

# alpha = 0.05, beta = 1 - power = 0.18 
# so lan lap = 11

plan <- expand.grid(d=c(0.5, 1.0, 1.5), t1=-275, t2=-275)

rep(plan, 11)

experiment <- rep(plan, 11)

# ngau nhien hoa cac lan thuc hien thi nghiem
experiment <- experiment[sample(1:nrow(experiment)),]

# ghi lai ket qua ngau nhien hoa ra file experiment.csv
write.csv(experiment, 'experiment.csv', row.names = FALSE)

# sau khi thuc hien xong thi nghiem, luu ket qua ra file experiment_done.csv

# do file ket qua thi nghiem dua vao bien kq
kq <- read.csv('experiment_done.csv')


# xay dung mo hinh hoi quy tuyen tinh cho ket qua thu duoc
model <- lm(data=kq, t2 ~ d + t1)
summary(model)