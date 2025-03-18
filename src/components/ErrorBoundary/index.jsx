import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能夠顯示錯誤 UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 你也可以將錯誤記錄到錯誤報告服務
    console.error("錯誤捕獲:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定義任何想要的錯誤 UI
      return (
        <div style={{ padding: '20px', color: 'red', border: '1px solid red', borderRadius: '5px', margin: '10px' }}>
          <h2>出錯了！</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{ 
              marginTop: '10px', 
              padding: '8px 16px', 
              backgroundColor: '#f44336', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            返回首頁
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
