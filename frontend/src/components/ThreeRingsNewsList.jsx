import React, { memo } from "react"
import styled from "styled-components"

const NewsTableContainer = styled.table`
  width: 100%;
  justify-content: center;
`

const NewsHeaderContainer = styled.thead`
  background-color: #f5fcee;
  width: 100%;
`

const NewsTRowContainer = styled.tr``

const NewsBodyContainer = styled.tbody`
  background-color: lightgrey;
  width: 100%;
`

const NewsHeader = styled.th`
  padding: 30px;
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  text-align: center;
  justify-content: center;
`

const NewsItemContainer = styled.tr``

const NewsItem = styled.div`
  background-color: lightgrey;
  margin: 10px;
`

const NewsItemTitle = styled.div`
  margin: 10px;
  font-weight: bold;
  font-size: 20px;
`

const NewsItemAuthor = styled.div`
  margin: 10px;
  color: darkblue;
`

const ThreeRingsNewsList = (props) => {
  return (
    <NewsTableContainer>
      <NewsHeaderContainer>
        <NewsTRowContainer>
          <NewsHeader>News</NewsHeader>
        </NewsTRowContainer>
      </NewsHeaderContainer>
      <NewsBodyContainer>
        {props.newsData.map((newsItem) => (
          <NewsItemContainer key={newsItem.id}>
            <td>
              <NewsItemTitle>{newsItem.title}</NewsItemTitle>
              <NewsItem>
                {/* Next line removes all html tags in newsItem body */}
                <div dangerouslySetInnerHTML={{ __html: newsItem.body }}></div>
              </NewsItem>
              <NewsItemAuthor>
                Posted by: {newsItem.creator.name}
              </NewsItemAuthor>
            </td>
          </NewsItemContainer>
        ))}
      </NewsBodyContainer>
    </NewsTableContainer>
  )
}

export default memo(ThreeRingsNewsList)
