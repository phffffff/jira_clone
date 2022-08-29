import style from './Loading.module.scss';

function Loading() {
    return (
        <div className={style.bgLoading}>
            <div className={style.ldsSpinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loading;
