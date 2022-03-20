import React from 'react'
import style from '../../pages/TodoList/style.module.css'
import LoadingIcons from 'react-loading-icons';
import { useSelector } from 'react-redux';
export default function LoadingAnimation() {
    const isLoading = useSelector(state => state.loadingState.isLoading);
    console.log("isLoading",isLoading)
    if (isLoading) {
        return (
            <div className={style.loading}>
                <LoadingIcons.Audio fill="#06bcee" width='150px' height='150px'></LoadingIcons.Audio>
            </div>
            )
    } else {
        return ""
    }

}
