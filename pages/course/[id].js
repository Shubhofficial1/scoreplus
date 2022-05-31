import styles from './Country.module.css'
import React from 'react'
import Link from 'next/link'
import Moment from 'react-moment'
import YouTube from 'react-youtube'

const getCourse = async (id) => {
  const res = await fetch(
    ` https://eb69c8de-c627-47d4-b0bd-246d961cbfd3.mock.pstmn.io/youtube/id?id=${id}`
  )
  const course = await res.json()
  return course
}

const Course = ({ course }) => {
  return (
    <div className={styles.course__container}>
      <Link href={'/'}>
        <h2 className={styles.course__goback}>Go Back</h2>
      </Link>
      <div className={styles.course__video}>
        <YouTube className={styles.video} videoId={course.link} />
      </div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <Moment fromNow>{course.createdAt}</Moment>
      <div className={styles.tags}>{course.tags.split(',').join('   ')}</div>
      {/* {<pre>{JSON.stringify(course, null, 2)}</pre>} */}
    </div>
  )
}

export default Course

export const getStaticPaths = async () => {
  const res = await fetch(
    'https://eb69c8de-c627-47d4-b0bd-246d961cbfd3.mock.pstmn.io/youtube?class=10th&subject=Maths'
  )
  const courses = await res.json()

  const paths = courses.map((course) => ({
    params: {
      id: course.id.toString(),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const course = await getCourse(params.id)
  return {
    props: {
      course,
    },
  }
}
