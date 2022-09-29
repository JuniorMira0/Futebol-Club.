export const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export const userLoginBody = {
  email: "admin@admin.com",
  password: "secret_admin"
}

export const userLoginMailFail = {
  email: "adminadmin.com",
  password: "secretadmin"
}

export const userLoginPassFail = {
  email: "admin@admin.com",
  password: "secretadmin"
}

export const userLoginEmpryBody = {
  email: "admin@admin.com"
}

export const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOjEsImlhdCI6MTY2NDQxMTQ5MywiZXhwIjoxNjY1Mjc1NDkzfQ.cevadfi9SGEhq6tj645EPG77l2kGwO6bDynxFDkM_ls'