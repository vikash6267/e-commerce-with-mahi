const productStock = (product) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <title>Product Back in Stock</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
    
        .message {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
    
        .body {
          font-size: 16px;
          margin-bottom: 20px;
        }
    
        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #FFD60A;
          color: #000000;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
    
        .support {
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
        }
    
        .highlight {
          font-weight: bold;
        }
      </style>
    
    </head>
    
    <body>
      <div class="container">
        <a href="#"><img class="logo" src="https://i.ibb.co/JmSr8ZJ/logo.png" alt="Your Company Name"></a>
        <div class="message">Product Back in Stock!</div>
        <div class="body">
          <p>Dear User,</p>
          <p>Great news! The size <strong>${product.size}</strong> of the product <strong>${product.title}</strong> is now back in stock.</p>
          <div style="margin: 20px 0;">
            <img src="${product.photo}" alt="${product.title}" style="max-width: 100%; height: auto; border-radius: 8px;"/>
          </div>
          <p>Price: <strong>INR ${product.price}/-</strong></p>
          <p>Click the button below to purchase the item before it's gone again!</p>
          <a href="https://absense.fashion.mahitechnocrafts.in/product/${product?._id}" class="cta">View Product</a>
        </div>
        <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:support@mahitechnocrats.in">support@mahitechnocrats.in</a>. We are here to help!</div>
      </div>
    </body>
    
    </html>`;
  };
  
  module.exports = productStock;
  