import { Card } from "@material-ui/core";

/**
 * 
 * @param info in the following structure:
 * info = {
 *  title: [title],
 *  description: [desc],
 *  playlistId: [youtube playlist id]
 * }
 * @returns 
 */
export function Course(info) {
  return (
    <div>
      <Card>Title: {info.title}</Card>
    </div>
  )
}