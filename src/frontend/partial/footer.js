import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <section className="footer">
        <div class="container text-center text-md-start mt-5">
          <div class="row mt-3">
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 class="fw-bold mb-4">
                <i class="fas fa-gem me-3">Thông tin</i>
              </h6>
              <p>
                Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng
                góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản
                phẩm tốt hơn nữa.
              </p>
              <p>Dĩ An - Bình Dương</p>
              <p>0384411405</p>
              <p>daovanphuong@gmail.com</p>
              <p>Folower Tis :</p>
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class=" fw-bold mb-4">CHÍNH SÁCH</h6>
              <p>
                <Link className="text-none" to="">Chính sách thành viên</Link>
              </p>
              <p>
                <Link to="">Chính sách vận chuyển</Link>
              </p>
              <p>
                <Link to="">Chăm sóc khách hàng</Link>
              </p>
              <p>
                <Link to="">Phương thức thanh toán</Link>
              </p>
              <p>
                <Link to="">Chính sách đổi trả / bảo hành</Link>
              </p>
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="fw-bold mb-4">HƯỚNG DẪN</h6>
              <p>
                <Link to="">Denny Member</Link>
              </p>
              <p>
                <Link to="">Mua hàng dễ dàng</Link>
              </p>
              <p>
                <Link to="">Hợp tác nhượng quyền</Link>
              </p>
              <p>
                <Link to="">Hướng dẫn mua hàng online</Link>
              </p>
              <p>
                <Link to="">Hướng dẫn kiểm tra hạng thẻ thành viên</Link>
              </p>
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class=" fw-bold mb-4">HƯỚNG DẪN</h6>
              <p>
                <Link to="">Denny Member</Link>
              </p>
              <p>
                <Link to="">Mua hàng dễ dàng</Link>
              </p>
              <p>
                <Link to="">Hợp tác nhượng quyền</Link>
              </p>
              <p>
                <Link to="">Hướng dẫn mua hàng online</Link>
              </p>
              <p>
                <Link to="">Hướng dẫn kiểm tra hạng thẻ thành viên</Link>
              </p>
            </div>
          </div>
        </div>

        <b>
          {" "}
          <i>
            <div className="copyright border-top  text-center pt-3 ">
              Design by: Đào Văn Phương
            </div>
          </i>
        </b>
      </section>
    </>
  );
}

export default Footer;
