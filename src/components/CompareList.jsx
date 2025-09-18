import { useGlobalContext } from '../contexts/GlobalContext';
import ToastMessage from './ToastMessage';
export default function CompareList() {

    const { compareList, setCompareList } = useGlobalContext();
    function handleRemoveCompare(id) {
        setCompareList(prev => prev.filter(coffee => coffee.id !== id));
    }


    return (
        <>
            <ToastMessage />
            {compareList.length > 0 && (
                <div className="compare-bar d-flex align-items-center justify-content-between sticky-bottom">
                    <div className="d-flex gap-2 overflow-auto">
                        {compareList.map(coffee => (
                            <div key={coffee.id} className="compare-item d-flex align-items-center gap-1">
                                <span>{coffee.title}</span>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleRemoveCompare(coffee.id)}
                                >
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-compare" disabled={compareList.length < 2}>
                        Confronta ora
                    </button>
                </div>
            )}
        </>
    );
}