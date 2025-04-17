function RecentMessages({prop}){

}

function TopReactions({prop}){

}

//q백그라운드 이미지/컬러 적용. 함수로 해결할것인가.. 파라미터로 백그라운드 값을 받아서, 인라인 스타일로 해결?
function backGroundSetting(backGround){
    const background = {
        // @include backGround;
        "width": "300px",
        "background-color": backGround,
        
    }
    return background
}

//{messageCount}명이 작성했어요! - 메세지 개수인데, 사람수로 판단한 멘트..가 과연 맞는지 모르겠다.
function RecipientCardSet({Recipient}){
    const {name, recentMessages, messageCount, topReactions, backgroundColor, backgroundImageURL, createdAt}=Recipient;
    return(
        <div className={`card-set-${backgroundImageURL? backgroundImageURL:backgroundColor}`}>
            <h3>{name}</h3>
            <RecentMessages prop={recentMessages}></RecentMessages>
            <span>{messageCount}명이 작성했어요!</span>
            <hr></hr>
            <TopReactions prop={topReactions}></TopReactions>

            <h2>
                {createdAt}
            </h2>
        </div>
            

        
    )
}

import { useState } from "react";
import { useEffect } from "react";
import { getList } from "./listApi";



function RecipientCardSetList(){
    const [data, setData] = useState([]);
    const [popularity, setPopularity] = useState([]);
    const [recently, setRecently] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            const {results} = await getList();
            // setData(response);
            setData(results);

            // const date = response.results[0].recentMessages[0].createdAt;
            // setCreatedAt(date);
            // const popularity = response.results[0].messageCount + response.results[0].reactionCount;
            // setPopularity(popularity);
        };
        fetchList();
    }, []);

    // let popularity=[];
    // let recently=[];
    useEffect(()=>{
        const sortedByPopularity=[...data].sort((a,b)=>(b.messageCount + b.reactionCount)-(a.messageCount + a.reactionCount));
        const sortedByDate=[...data].sort((a,b)=>(new Date(b.createdAt) - new Date(a.createdAt)));
        // console.log(popularity);
        // console.log(recently);
        setPopularity(sortedByPopularity);
        setRecently(sortedByDate);
    }, [data]);

    console.log("###############");
    console.log(data);

    console.log("###############");
    console.log(popularity);
    console.log(recently);

    //section이 가장 적합할지 고민해보기
    return(
        <>
        <h2>인기 롤링 페이퍼 </h2>  
        <section className="card-set-list">
            {popularity.map((it)=>(
                <RecipientCardSet Recipient={it}></RecipientCardSet>
            ))}
        </section>
        <h2>최근에 만든 롤링 페이퍼 </h2>  
        <section className="card-set-list">
            {recently.map((it)=>(
                <RecipientCardSet Recipient={it}></RecipientCardSet>
            ))}
        </section>       
        </>
        
       
    )
}

export default RecipientCardSetList;