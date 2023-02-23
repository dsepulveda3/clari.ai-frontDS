import instance from "../instance"

export function create_question(body) {
  return instance({
    method: 'post',
    url: 'questions',
    data: body
  })
}

export function like_question(body) {
  return instance({
    method: 'post',
    url: 'questions/like',
    data: body
  })
}

export function dislike_question(body) {
  return instance({
    method: 'post',
    url: 'questions/dislike',
    data: body
  })
}

export function feedback_question(body) {
  return instance({
    method: 'post',
    url: 'questions/feedback',
    data: body
  })
}
