package com.dohit.huick.domain.user.dto;

import java.time.LocalDateTime;

import com.dohit.huick.api.user.dto.UserApiDto;
import com.dohit.huick.domain.auth.constant.Role;
import com.dohit.huick.domain.auth.constant.SocialType;
import com.dohit.huick.domain.banking.account.dto.AccountDto;
import com.dohit.huick.domain.user.entity.User;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserDto {

	private Long userId;
	private String name;
	private String rrn;
	private String address;
	private String walletAddress;
	private SocialType socialType;
	private String socialId;
	private LocalDateTime createdTime;
	private Role role;
	private LocalDateTime withdrawalTime;
	private String signatureUrl;
	private String phoneNumber;
	private LocalDateTime issueDate;
	private AccountDto accountInfo;

	@Builder
	private UserDto(Long userId, String name, String rrn, String address, String walletAddress, SocialType socialType,
		String socialId, LocalDateTime createdTime, Role role, LocalDateTime withdrawalTime, String signatureUrl,String phoneNumber,
		LocalDateTime issueDate, AccountDto accountInfo) {
		this.userId = userId;
		this.name = name;
		this.rrn = rrn;
		this.address = address;
		this.walletAddress = walletAddress;
		this.socialType = socialType;
		this.socialId = socialId;
		this.createdTime = createdTime;
		this.role = role;
		this.phoneNumber = phoneNumber;
		this.withdrawalTime = withdrawalTime;
		this.signatureUrl = signatureUrl;
		this.issueDate = issueDate;
		this.accountInfo = accountInfo;
	}

	public static UserDto of(Long userId, UserApiDto.Request request) {
		return UserDto.builder()
			.userId(userId)
			.name(request.getName())
			.rrn(request.getRrn())
			.address(request.getAddress())
			.phoneNumber(request.getPhoneNumber())
			.build();
	}

	public static UserDto from(User user) {
		return UserDto.builder()
			.userId(user.getUserId())
			.name(user.getName())
			.rrn(user.getRrn())
			.address(user.getAddress())
			.walletAddress(user.getWalletAddress())
			.socialType(user.getSocialType())
			.socialId(user.getSocialId())
			.createdTime(user.getCreatedTime())
			.role(user.getRole())
			.withdrawalTime(user.getWithdrawalTime())
			.signatureUrl(user.getSignatureUrl())
			.issueDate(user.getIssueDate())
			.phoneNumber(user.getPhoneNumber())
			.build();
	}

	public static UserDto of(UserDto userDto, AccountDto accountDto) {
		return UserDto.builder()
			.userId(userDto.getUserId())
			.name(userDto.getName())
			.rrn(userDto.getRrn())
			.address(userDto.getAddress())
			.walletAddress(userDto.getWalletAddress())
			.socialType(userDto.getSocialType())
			.socialId(userDto.getSocialId())
			.createdTime(userDto.getCreatedTime())
			.role(userDto.getRole())
			.withdrawalTime(userDto.getWithdrawalTime())
			.signatureUrl(userDto.getSignatureUrl())
			.issueDate(userDto.getIssueDate())
			.phoneNumber(userDto.getPhoneNumber())
			.accountInfo(accountDto)
			.build();
	}

	public static UserDto from(String name) {
		return UserDto.builder()
			.name(name)
			.build();
	}
}
