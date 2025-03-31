type props = {
  url: string;
  host?: string;
}

export function text({ url }: props) {
  return `以下のリンクにアクセスして認証を完了してください:\n\n${url}\n\nもしこのメールに心当たりがない場合は、このメールを無視してください。`;
}

export function html({ url, host }: props) {
  // テーマに primary カラーが設定されていない場合のフォールバックカラーも設定
  const primaryColor = "#346df1";

  return `
  <div style="font-family: sans-serif; padding: 20px;">
    <h1 style="font-size: 24px; color: ${primaryColor}; margin-bottom: 16px;">
      ${host} へのサインイン
    </h1>
    <p style="font-size: 16px; margin-bottom: 24px;">
      下記のボタンをクリックして、認証を完了してください。
    </p>
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="${url}" style="display: inline-block; padding: 12px 24px; font-size: 18px; color: #ffffff; background-color: ${primaryColor}; text-decoration: none; border-radius: 4px;">
        認証する
      </a>
    </div>
    <p style="font-size: 14px; color: #666666;">
      もしこのメールに心当たりがない場合は、このメールを無視してください。
    </p>
  </div>
  `;
}