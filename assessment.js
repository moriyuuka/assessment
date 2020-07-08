'use strict';
const userNameInput = document.getElementById('user-name');//名前をinputするとこと
const assessmentButton = document.getElementById('assessment');//ボタン
const resultDivided = document.getElementById('result-area');//結果
const tweetDivided = document.getElementById('tweet-area');//ツイート

/**
 * 指定した要素の子供を全て削除する
 * @param{HTMLElement}element HTMLの要素
 */
function removeAllChildren(element){
  while(element.firstChild){
     // 子どもの要素があるかぎり削除
     element.removeChild(element.firstChild);
  }
}

/**
 * 指定した要素に診断けっかようのタグを設定する
 * @param{HTMLelement}element HTMLの要素
 */
function appendAssessmentResult(element, result) {
  const h3 = document.createElement('h3');
  h3.innerText = '診断結果';
  element.appendChild(h3);

  const p = document.createElement('p');
  p.innerText = result;
  element.appendChild(p);//このelement(resultdivided)は、はじめは空だったが、、
}

function appendTweetButton(element, message){
  const a=document.createElement('a');
  const href='https://twitter.com/intent/tweet?button_hashtag='
  + encodeURIComponent('あなたのいいところ')
  +'&ref_src=twsrc%5Etfw';
  
  a.setAttribute('href',href);//引数二つ、この一行を追加しますという意味
  a.className = 'twitter-hashtag-button';
  a.setAttribute('data-text',message);
  a.innerText='Tweet #あなたのいいところ';
  //aタグをｈｔｍｌに表示する
  element.appendChild(a);
  
  const script=document.createElement('script');
  script.setAttribute('src','https://platform.twitter.com/widgets.js');
  element.appendChild(script);
  }

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    // TODO ボタンのonclick() 処理を呼び出す
    assessmentButton.onclick();
  }
};


assessmentButton.onclick = ()=>{
console.log('ボタンが押されました');
let userName=userNameInput.value;
if(!userName){
  // 名前の入力がなかったので処理を中断
  return;
}
//TODO 診断結果表示エリアの作成
removeAllChildren(resultDivided);//まず空にする
const result=assessment(userName);
appendAssessmentResult(resultDivided,assessment(userName));
 //const result=assessment(userName);//授業ではここが打てなかった
//resultDivided とresultdividedに、なっていたのに気がつかなかった

//ツイートボタンの表示
//aタグを作って属性を設定する
removeAllChildren(tweetDivided);
appendTweetButton(tweetDivided,result);


}

const answers=[//これは配列
 '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
 '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
 '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
 '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
 '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
 '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
 '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
 '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
 '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
 '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
 '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
 '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
 '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
 '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
 '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
 '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}userName　ユーザーの名前
 * @return{string}診断けっか
 *  */

function assessment(userName){
  let userNameNumber=0;//初期化するための
  for (let i=0;i<userName.length;i++){
   userNameNumber+=userName.charCodeAt(i);//charCodeAtは(数字)番目の文字を数値に変換する
        //ここではiなので、回数繰り返し、しかも足す
        //そして、userNameNumberが完成するので、次に渡す
  }
//var userNameNumber=userName.charCodeAt(0);//TO DO 診断結果を後から書く
//回答結果の範囲（0から15）に変換
var answerNumber=userNameNumber%answers.length;
var result=answers[answerNumber];
return result.replace(/\{userName\}/g, userName);//置き換えている
//replace(,)引数二つ
// \これはaltと¥を押すと入力できる見たい　このキーボードだと

}

  console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎') === assessment('太郎'),//おなじはずなのに、正しくならなかったのは、
    // userNameの中に入っているデータを0（初期化）しなかったから。
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log(assessment('太郎'));
  console.log(assessment('太郎'));
