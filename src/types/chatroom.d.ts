export interface ChatroomInfo {
  chatroomId:    string;  // チャットルームのID
  title:         string;  // チャットルームのタイトル　directの場合は相手の名前、groupの時はchatroomのtitle
  lastMessage:   string;  // 最後のメッセージ
  lastMessageAt: Date;    // 最後のメッセージの日時
  unread:        boolean; // 未読かどうか
}
