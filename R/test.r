library(daewr)
library(mefa)

setwd("D:/")

# tinh do lech chuan su dung ket qua cua 3 lan do voi khoang cach 1 cm
sd(c(0.3, 0.25, 0.27))

# ket qua thi nghiem voi cac khoang cach do 1, 3 va 4 cm
kehoachthinghiem <- expand.grid(d=c(1, 3, 4), t1=-275, t2=-275)

# ham Fpower de xac dinh so lan lap
Fpower1(alpha = 0.05, nlev = 3, nreps = 3:10, Delta = 0.05, sigma = 0.02)

# alpha = 0.05, beta = 1 - power = 0.06, power = 0.94
# so lan lap = 6

class(kehoachthinghiem)
plan <- rep(kehoachthinghiem, 6)

# ngau nhien hoa cac lan thuc hien thi nghiem
plan <- plan[sample(1:nrow(experiment)),]

# ghi lai ket qua ngau nhien hoa ra file ketqua.csv
write.csv(plan, 'kequa.csv', row.names = FALSE)

kq <- read.csv('experiment_done.csv')

model <- lm(data=kq, t2 ~ d + t1)
summary(model)