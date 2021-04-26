# VVS server (Development)


## User
- [x] **Log In** &#8594; POST /user/login
- [x] **Sign Up** &#8594; POST /user/signup
- [x] **Get joined community list** &#8594; GET /user/:id/communities
- [x] Find user by ObjectID &#8594; GET /user/find?cmd=id&value='id'
- [x] Find users by Username &#8594; GET /user/find?cmd=name&value='name'
- [ ] Find users by other options
- [ ] Set user profile
- [ ] Join or send request to community &#8594; PATCH /user/:id/community/:id

## Communities
<<<<<<< HEAD
- [x] **Create new community** &#8594; POST /communities
- [x] Find community by ObjectID &#8594; GET /communities/find?cmd=id&value='id'
- [x] Find communities by name &#8594; GET /communities/find?cmd=name&value='name'
=======
- [x] **Create new community** &#8594; /communities
- [ ] Find community 
>>>>>>> 27042803b2b26d712fc0d2f12f36c50844a44b77
- [ ] Get community's posts
- [ ] Update Community
- [ ] Delete Community
- [ ] Accept or decline join request &#8594; PATCH /communities/:id/user/:id
- [ ] Create new post in a community &#8594; POST /communities/:id/post
## Posts
- [x] **Create new post** &#8594; POST /posts
- [ ] Create new post in joined community
- [ ] Update my post
- [ ] Delete my post
- [ ] Get my specific user's posts

## Comments
- [ ] Create new comment 
- [ ] Update my comment
- [ ] Delete my comment
- [ ] Get comments of specific post

## Main Features
- [ ] Upload imgs, vids on post
- [ ] Friends request
- [ ] Message
- [ ] Group Chat
- [ ] Voice Chat
- [ ] Screen Sharing
- [ ] Email verification
- [ ] Phone verification
