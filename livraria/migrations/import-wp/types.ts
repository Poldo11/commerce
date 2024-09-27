import type {
  WP_REST_API_Categories,
  WP_REST_API_Posts,
  WP_REST_API_Tags,
  WP_REST_API_Users
} from 'wp-types'
  
  export type WordPressDataType = 'categories' | 'posts' | 'tags' | 'users'
  
  export type WordPressDataTypeResponses = {
    categories: WP_REST_API_Categories
    posts: WP_REST_API_Posts
    tags: WP_REST_API_Tags
    users: WP_REST_API_Users
  }
  
  export type SanitySchemaType = 'category' | 'post' | 'tag' | 'author'