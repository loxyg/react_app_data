import React, { useReducer, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Picker_Picture, Post, PostContent, User } from '../api/types'
import Field from '../private/Field'
import ImageGalleryPicker from './ImageGalleryPicker'
import { getPost, deletePost, updatePost, createPost } from '../api/post'
import { getAllUser } from '../api/user'


type FormEvent =
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>

type FormData = { name: string; value: string | number | undefined }

const formReducer = (state: Post | PostContent, event: FormData) => {
    return {
        ...state,
        [event.name]: event.value,
    }
}

const EditPost = () => {
    const [users, setUsers] = useState<Array<User>>([])
    const [showPictureModal, setShowPictureModal] = useState<boolean>(false)
    const [formData, setFormData] = useReducer(
        formReducer,
        {} as Post | PostContent
    )
    let { id } = useParams() // post id from url

    console.log('id', id)
    const navigate = useNavigate() // create a navigate function instance

    async function _getPost(id:number){
        const data= await getPost(id);
        convertToFormData(data);
    }

    async function _getUsers(){
        const data= await getAllUser();
        console.log('data', data)
        setUsers(data)
    }

    useEffect(() =>{
        // Chaque fois que l'id change
        _getPost(Number(id));
    },[id]);


    useEffect(() =>{
        // Au start du composant
        _getUsers();
    },[]);

    function handleModalPictureSubmit(picture: Picker_Picture) {
        setFormData({
            name: 'postImageUrl',
            value: picture.src,
        })
    }

    async function handleAddOrCreatePost(
        event: React.FormEvent<HTMLFormElement>
    ) {
        console.log(formData)
        event.preventDefault()   // remove default reloading page

        if (id) {
            await updatePost(formData as Post)
        } else {
            await createPost(formData)
        }


        navigate('/') // back to Home
    }

    async function handleDeletePost() {
        await deletePost(Number(id))
        navigate('/') // back to Home
    }

    function handleChange(event: FormEvent) {
        //
        const value =
            event.target.name === 'userId'
                ? Number(event.target.value)
                : event.target.value
        setFormData({
            name: event.target.name,
            value,
        })
    }

    function convertToFormData(post: Post): void {
        // helper to convert post data into formData
        // use it before set formData with API data
        // ex: convertToFormData(data):
        ;(Object.keys(post) as Array<keyof typeof post>).map((key) => {
            setFormData({
                name: key,
                value: post[key],
            })
        })
    }

    function handleToggleModal() {
        // Show & Hide picture modal
        setShowPictureModal((s) => !s)
    }

    function getSelectedPicture() {
        // prevent bad request and use a placeholder if no data
        if (formData.postImageUrl) {
            return formData.postImageUrl
        } else {
            return 'https://via.placeholder.com/320/810b14'
        }
    }

    function getSelectedAuthor() {
        // prevent bad request and use a placeholder if no data
        if (formData.userId) {
            const selectedUser = users.find((user) => user.id === formData.userId)
            console.log("selectedUser", selectedUser);
            if (selectedUser){
                return selectedUser.name
            }
        } else {
            return 'Unknown author'
        }
    }

    return (
        <>
            <form className="post-form" onSubmit={handleAddOrCreatePost}>
                <Field label="Title">
                    <input
                        onBlur={handleChange}
                        name="title"
                        onChange={handleChange}
                        className="input"
                        type="text"
                        placeholder="Text input"
                        value={formData.title}
                    />
                </Field>
                <Field label="Content">
                    <textarea
                        onBlur={handleChange}
                        name="body"
                        onChange={handleChange}
                        className="textarea"
                        placeholder="e.g. Hello world"
                        value={formData.body}
                    />
                </Field>
                <Field label="Post creator">
                    {!!!id ? (
                        <div className="select" defaultValue={formData.userId}>
                            {users.length > 0 && (
                                <select
                                    name="userId"
                                    onChange={handleChange}
                                    defaultValue={users[0].id}
                                >
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ) : (
                        <label>{getSelectedAuthor()}</label>
                    )}
                </Field>

                <Field label="Post Picture">
                    <input type="hidden" value="1" name="postImageID" />
                    <div>
                        <img src={getSelectedPicture()} />
                        <button
                            type="button"
                            className="button is-primary"
                            onClick={handleToggleModal}
                        >
                            Open picker modal
                        </button>
                    </div>
                </Field>

                {!!id && (
                    <Field label="Extra actions">
                        <button
                            type="button"
                            className="button is-warning"
                            onClick={handleDeletePost}
                        >
                            Delete post
                        </button>
                    </Field>
                )}

                <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                        <button type="submit" className="button is-primary">
                            Submit
                        </button>
                    </p>
                    <p className="control">
                        <Link to="/" className="button is-light">
                            Cancel
                        </Link>
                    </p>
                </div>
            </form>
            {showPictureModal && (
                <ImageGalleryPicker
                    onClose={handleToggleModal}
                    onSubmit={handleModalPictureSubmit}
                />
            )}
        </>
    )
}

export default EditPost
