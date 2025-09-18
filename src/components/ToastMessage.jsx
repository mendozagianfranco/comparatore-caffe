import { useGlobalContext } from '../contexts/GlobalContext';

export default function ToastMessage() {
    const { showMaxMessage } = useGlobalContext();
    return (
        showMaxMessage && (
            <div
                className="toast show align-items-center text-bg-warning border-0 position-fixed bottom-0 start-50 translate-middle-x m-4"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="d-flex">
                    <div className="toast-body">
                        Puoi confrontare massimo 5 caffè
                    </div>
                </div>
            </div>
        )
    );
}