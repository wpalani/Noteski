import "./UI.css";
import LottieLoading from "./AppButtonLoading.json";
import LottieSuccess from "./AppButtonSuccess.json";
import LottieError from "./AppButtonError.json";
import { Player, Controls } from '@lottiefiles/react-lottie-player';

/**
 * Reuseable Button to be used in the App
 */
const AppButton = ({ title, action, disabled, isLoading, isSuccess, isError }) => {

    if (isLoading) {
        return (
            <button className="noteski-btn noteski-btn-loading no-select">
                <Player
                    autoplay
                    loop
                    src={LottieLoading}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: '1.15rem',
                    }}>
                    <Controls visible={false} />
                </Player>
            </button>
        );
    }

    if (isSuccess) {
        return (
            <button className="noteski-btn noteski-btn-success no-select">
                <Player
                    autoplay
                    loop={false}
                    keepLastFrame={true}
                    src={LottieSuccess}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: '1.15rem',
                    }}>
                    <Controls visible={false} />
                </Player>
            </button>
        );
    }

    if (isError) {
        return (
            <button className="noteski-btn noteski-btn-error no-select">
                <Player
                    autoplay
                    loop={false}
                    keepLastFrame={true}
                    src={LottieError}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: '1.15rem',
                    }}>
                    <Controls visible={false} />
                </Player>
            </button>
        );
    }

    return (
        <button
            className="noteski-btn no-select"
            onClick={action}
            disabled={disabled}
        >{title}</button>
    );
}

export default AppButton;