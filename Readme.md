# VVS server (Development)
### *Express.js + MongoDB + Redis*

Heroku Demo: https://vvs-backend.herokuapp.com/

## Auth
- [x] **Log In** &#8594; POST /auth/login
- [x] **Sign Up** &#8594; POST /auth/signup
- [x] **Refresh Token** &#8594; POST /auth/refresh-token
- [x] **Log Out** &#8594; POST /auth/logout

## User
- [x] **Get joined community list** &#8594; GET /user/:id/communities
- [ ] Get user's posts &#8594; GET /user/:id/posts
- [ ] Get user's posts at joined communities &#8594; GET /user/:id/community-posts
- [x] **Find user by ObjectID** &#8594; GET /user/find?cmd=id&value='id'
- [x] **Find users by Username** &#8594; GET /user/find?cmd=name&value='name'
- [ ] Find users by other options
- [ ] Set user profile

## Communities
- [x] **Create new community** &#8594; POST /communities
- [x] **Find community by ObjectID** &#8594; GET /communities/find?cmd=id&value='id'
- [x] **Find communities by name** &#8594; GET /communities/find?cmd=name&value='name'
- [x] **Get community's posts** &#8594; GET /communities/:id/posts
- [ ] Update Community
- [ ] Delete Community
- [x] **Join or send request to community** &#8594; PATCH /communities/:id/join
- [x] **Accept or decline join request** &#8594; PATCH /communities/:communityid/join/:userid
- [ ] Trend communities &#8594; GET /communities/trend
- [x] **Latest communities** &#8594; GET /communities/latest (Pagination has to be added)
## Posts
- [x] **Create new post** &#8594; POST /posts
- [ ] Update my post
- [ ] Delete my post
- [ ] Get my specific user's posts

## Comments
- [ ] Create new comment 
- [ ] Update my comment
- [ ] Delete my comment
- [ ] Get comments of specific post

## Main Features to update
- [x] Upload imgs, vids
- [ ] Friends request
- [ ] Real time Message
- [ ] Handle imgs, vids properly
- [ ] Group Chat
- [ ] Voice Chat
- [ ] Screen Sharing
- [ ] Email verification
- [ ] Phone verification