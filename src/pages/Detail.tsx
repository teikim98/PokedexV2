import { useParams } from 'react-router-dom'

const Detail = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            <h1 className="text-3xl font-bold">포켓몬 상세정보</h1>
            {/* 포켓몬 ID: {id} */}
        </div>
    )
}

export default Detail
