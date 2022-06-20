import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { sub } from "date-fns"
import axios from "axios"

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

const postAdaptor = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});
console.log(postAdaptor)

const initialState = postAdaptor.getInitialState({
    status: 'idle', // 'idle' | "loading" | "succeeded" | "failed"
    error: null
})

//async thunk code 
export const fetchPosts = createAsyncThunk('posts/fetctPosts', async () => {
    try {
        const response = await axios.get(POST_URL)
        return [ ...response.data ]
    } catch (error) {
        return error.message
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POST_URL, initialPost)
        return response.data
    } catch (err) {
        return err.message
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;

    try {
        const response = await axios.put(`${POST_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        return initialPost;
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POST_URL}/${id}`)
        if(response?.status === 200) return initialPost;
        return `${response?.status}: ${response.statusText}`
    } catch (err) {
        return err.message
    }
})



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        //state.push mutate state which is not proper
        //but react toolkit uses immerjs under the hood which allows you to mutate the state but it isnot mutating the state it create new state underneath
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.entities[postId]
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                //Adding the date and reactions
                let min = 1;
                const loadedPost = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post
                });
                //Add the fetched post in to the array
                postAdaptor.upsertMany(state, loadedPost)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                postAdaptor.addOne(state, action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if(!action.payload?.id) {
                    console.log("Update could not be complete");
                    console.log(action.payload)
                    return;
                }
                action.payload.date = new Date().toISOString()
                postAdaptor.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if(!action.payload?.id) {
                    console.log("Update could not be complete");
                    return;
                }
                const { id } = action.payload;
                postAdaptor.removeOne(state, id)
            })
    }
});

//getSelector creates this selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPost,
    selectById: selectPostById,
    selectIds: selectPostIds
    //pass in the selector that returns the post slice of the state
} = postAdaptor.getSelectors(state => state.posts);

export const getPostStatus = (state) => state.posts.status
export const getPostError = (state) => state.posts.error

export const selectPostByUser = createSelector(
    [selectAllPost, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;